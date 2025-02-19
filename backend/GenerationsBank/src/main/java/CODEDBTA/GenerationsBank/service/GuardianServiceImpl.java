package CODEDBTA.GenerationsBank.service;

import CODEDBTA.GenerationsBank.bo.CreateUserRequest;
import CODEDBTA.GenerationsBank.bo.guardian.AccountResponse;
import CODEDBTA.GenerationsBank.bo.guardian.RestrictionRequest;
import CODEDBTA.GenerationsBank.bo.guardian.TransactionResponse;
import CODEDBTA.GenerationsBank.entity.AccountEntity;
import CODEDBTA.GenerationsBank.entity.TransactionEntity;
import CODEDBTA.GenerationsBank.entity.UserEntity;
import CODEDBTA.GenerationsBank.enums.Roles;
import CODEDBTA.GenerationsBank.enums.TransactionStatus;
import CODEDBTA.GenerationsBank.exception.InsufficientBalanceException;
import CODEDBTA.GenerationsBank.exception.InvalidRoleException;
import CODEDBTA.GenerationsBank.repository.AccountRepository;
import CODEDBTA.GenerationsBank.repository.TransactionRepository;
import CODEDBTA.GenerationsBank.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class GuardianServiceImpl implements GuardianService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final VerificationTokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public GuardianServiceImpl(UserRepository userRepository, EmailService emailService, VerificationTokenService tokenService, PasswordEncoder passwordEncoder, AccountRepository accountRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public String CreateUserAccount(CreateUserRequest request) {

        String fieldMissing = validateFieldsOfRequest(request);

        // if a required field is missing, return missing field name
        if (fieldMissing != null){
            return fieldMissing;
        }

        // Ensure user has not registered with the same email address
        if (userRepository.findByEmail(request.getEmail())!= null){
            return "The email address '"+request.getEmail()+"' is already registered with."; // Return the name of the empty field
        }

        // Ensure user has not registered with the same username address
        if (userRepository.findByEmail(request.getUsername())!= null){
            return "The username '"+request.getUsername()+"' is already registered with."; // Return the name of the empty field
        }

        String token = tokenService.generateToken(request.getEmail().toLowerCase());

        try {
            emailService.sendVerificationEmail(request.getEmail().toLowerCase(), token, request.getUsername());
        } catch (MessagingException e) {
            return "Unable to send Verification email to the address provided. Please ensure it is entered correctly.";
        }

        Roles role;

        if (request.getRole() == null){
            role = Roles.GUARDIAN;
        }
        else {
            role = request.getRole();
        }

        // create userEntity and store to repository, ensuring verified variable is false pending email verification
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(request.getEmail().toLowerCase()); // toLowerCase() to ensure its case in-sensitive
        userEntity.setPassword(passwordEncoder.encode(request.getPassword())); // Abdulrahman: Encoded password using Bcrypt
        userEntity.setName(request.getUsername());//case-sensitive to make it personalized
        userEntity.setAge(request.getAge());
        userEntity.setAddress(request.getAddress());
        userEntity.setPhoneNumber(request.getPhoneNumber());
        userEntity.setVerified(false);//by default, the user is unverified. only after verification via email is this turned true
        userEntity.setRole(role);// defaults to guardian for time being
        UserEntity savedUser = userRepository.save(userEntity);

        // Add AccountEntity if initial balance is provided
        AccountEntity account = new AccountEntity();
        if (request.getInitialBalance() != null) {
            account.setBalance(Double.parseDouble(request.getInitialBalance()));
        }
        else {
            account.setBalance(0.0d );
        }
        account.setUser(savedUser); // Associate account with user
        accountRepository.save(account); // Save the account entity


        // If no empty fields are found, return null to indicate all fields are valid
        return null;
    }

    @Override
    public String validateFieldsOfRequest(CreateUserRequest request){
        // Create a Set to store the field names you want to skip (e.g., "age")
        Set<String> fieldsToSkip = new HashSet<>();
        fieldsToSkip.add("age");  // Add the field you want to skip (e.g., "age")
        fieldsToSkip.add("role");
        fieldsToSkip.add("initialBalance");

        // Iterate over all declared fields of the CreateUserRequest class
        for (var field : request.getClass().getDeclaredFields()) {
            // Make the private fields accessible for reflection
            field.setAccessible(true);

            // If the field name is in the 'fieldsToSkip' set, skip this field and continue to the next one
            if (fieldsToSkip.contains(field.getName())) {
                continue; // Skip this field and move to the next iteration
            }

            try {
                // Get the value of the current field from the request object
                Object value = field.get(request);

                // If the field is null or an empty string, return the name of the empty field
                if (value == null || (value instanceof String && ((String) value).isEmpty())) {
                    return "The field '" + field.getName() + "' is required and cannot be empty."; // Return the name of the empty field
                }
            } catch (IllegalAccessException e) {
                // Handle any reflection-related access exceptions (e.g., if the field is not accessible)
                e.printStackTrace();
            }
        }
        // if all fields are satisfied, return null
        return null;
    }

    @Override
    public void transfer(Long fromId, Long toId, double amount) {

        //Finding the account
        AccountEntity senderAccount = accountRepository.findById(fromId)
                .orElseThrow(() -> new EntityNotFoundException("Sender account not found"));
        AccountEntity receiverAccount = accountRepository.findById(toId)
                .orElseThrow(() -> new EntityNotFoundException("Receiver account not found"));

        //Error Checking
        if (amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be greater than zero");
        }
        if (senderAccount.getBalance() < amount) {
            throw new InsufficientBalanceException("Insufficient funds in the sender's account");
        }


        if (senderAccount.getUser().getRole().equals(Roles.GUARDIAN)) {
            senderAccount.setBalance(senderAccount.getBalance() - amount);
            receiverAccount.setBalance(receiverAccount.getBalance() + amount);

            //Saving the updated balance
            accountRepository.save(senderAccount);
            accountRepository.save(receiverAccount);

            //Logging the transaction
            TransactionEntity transaction = new TransactionEntity();
            transaction.setTransactionFrom(senderAccount.getUser().getName());
            transaction.setTransactionTo(receiverAccount.getUser().getName());
            transaction.setAccount(senderAccount);
            transaction.setAmount(amount);
            transaction.setStatus(TransactionStatus.APPROVED);
            transaction.setTimeStamp(LocalDateTime.now());
            transaction = transactionRepository.save(transaction);
            senderAccount.addTransaction(transaction);
            accountRepository.save(senderAccount);
        }
    }

    @Override
    public void addDependent(Long guardianId, Long dependentId) {
        UserEntity guardian = userRepository.findById(guardianId)
                .orElseThrow(() -> new EntityNotFoundException("Guardian ID not found"));
        UserEntity dependent = userRepository.findById(dependentId)
                .orElseThrow(() -> new EntityNotFoundException("Dependent ID not found"));

        if (!dependent.getRole().equals(Roles.DEPENDENT)) {
            throw new InvalidRoleException("The user is not a valid dependent");
        }
        if (!guardian.getRole().equals(Roles.GUARDIAN)) {
            throw new InvalidRoleException("The user is not a valid guardian");
        }

        List<UserEntity> dependentList = guardian.getDependents();
        if (!dependentList.contains(dependent)) {
            dependentList.add(dependent);
            guardian.setDependents(dependentList);
            userRepository.save(guardian);
        }
        else {
            throw new RuntimeException("The dependant is already assigned to the guardian");
        }
    }

    @Override
    public List<UserEntity> viewDependents(Long guardianId) {
        UserEntity guardian = userRepository.findById(guardianId).orElseThrow(() -> new EntityNotFoundException("Guardian ID not found"));
        return guardian.getDependents();
    }

    @Override
    public List<TransactionResponse> viewTransactions(Long accountId, LocalDate startDate, LocalDate endDate, String category) {
        AccountEntity guardian = accountRepository.findById(accountId).orElseThrow(() -> new EntityNotFoundException("Account ID not found"));

        List<TransactionEntity> transactions = guardian.getTransactions();
        List<TransactionResponse> transactionResponses = new ArrayList<>();

        if (startDate != null && endDate != null) {
            transactions = transactions.stream()
                    .filter(transaction -> !transaction.getDate().isBefore(startDate) && !transaction.getDate().isAfter(endDate))
                    .toList();
        }

        if (category != null && !category.isEmpty()) {
            transactions = transactions.stream()
                    .filter(transaction -> transaction.getCategory().equalsIgnoreCase(category))
                    .toList();
        }

        for (TransactionEntity transaction : transactions) {
            TransactionResponse response = new TransactionResponse(transaction.getTransactionId(), transaction.getTransactionFrom(), transaction.getTransactionTo(), transaction.getAmount(), transaction.getStatus(), transaction.getTimeStamp());
            transactionResponses.add(response);
        }

        return transactionResponses;
    }

    @Override
    public void setSpendingLimit(Long dependentAccountId, double spendingLimit) {
        AccountEntity dependentAccount = accountRepository.findById(dependentAccountId).orElseThrow(() -> new EntityNotFoundException("Dependent Account ID not found"));
        if (spendingLimit < 0) {
            throw new IllegalArgumentException("Limit must be greater than zero");
        }
        dependentAccount.setSpendingLimit(spendingLimit);
        accountRepository.save(dependentAccount);
    }

    @Override
    public void approveTransaction(Long transactionId, boolean approval) {
        TransactionEntity transaction = transactionRepository.findById(transactionId).orElseThrow(() -> new EntityNotFoundException("Transaction ID not found"));

        if (approval) {
            transaction.setStatus(TransactionStatus.APPROVED);
            AccountEntity account = transaction.getAccount();

            if (account.getBalance() >= transaction.getAmount()) {
                account.setBalance(account.getBalance() - transaction.getAmount());
                accountRepository.save(account);
            } else {
                throw new InsufficientBalanceException("Insufficient balance for the transaction.");
            }
        } else {
            transaction.setStatus(TransactionStatus.REJECTED);
        }

        transactionRepository.save(transaction);
    }

    @Override
    public void setTransactionLimitDaily(Long dependentAccountId, double limit) {
        AccountEntity dependentAccount = accountRepository.findById(dependentAccountId).orElseThrow(() -> new EntityNotFoundException("Account ID not found"));
        if (limit < 0) {
            throw new IllegalArgumentException("Limit must be greater than zero");
        }
        dependentAccount.setMaxDaily(limit);
        accountRepository.save(dependentAccount);
    }

    @Override
    public void setTransactionLimitWeekly(Long dependentAccountId, double limit) {
        AccountEntity dependentAccount = accountRepository.findById(dependentAccountId).orElseThrow(() -> new EntityNotFoundException("Account ID not found"));
        if (limit < 0) {
            throw new IllegalArgumentException("Limit must be greater than zero");
        }
        dependentAccount.setMaxWeekly(limit);
        accountRepository.save(dependentAccount);
    }

    @Override
    public void setTransactionLimitMonthly(Long dependentAccountId, double limit) {
        AccountEntity dependentAccount = accountRepository.findById(dependentAccountId).orElseThrow(() -> new EntityNotFoundException("Account ID not found"));
        if (limit < 0) {
            throw new IllegalArgumentException("Limit must be greater than zero");
        }
        dependentAccount.setMaxMonthly(limit);
        accountRepository.save(dependentAccount);
    }

    @Override
    public void setTimeRestrictions(Long dependentAccountId, RestrictionRequest request) {
        AccountEntity dependentAccount = accountRepository.findById(dependentAccountId)
                .orElseThrow(() -> new EntityNotFoundException("Dependent account not found"));

        try {
            // Parse the restriction start and end times
            LocalTime restrictedStart = LocalTime.parse(request.getRestrictionStart());
            LocalTime restrictedEnd = LocalTime.parse(request.getRestrictionEnd());

            // Log to ensure times are being parsed correctly
            System.out.println("Restriction Start Time: " + restrictedStart);
            System.out.println("Restriction End Time: " + restrictedEnd);

            // Set the restriction times on the dependent account
            dependentAccount.setRestrictionStart(restrictedStart);
            dependentAccount.setRestrictionEnd(restrictedEnd);

            // Save the updated account entity to the database
            accountRepository.save(dependentAccount);
        } catch (DateTimeParseException e) {
            // Handle invalid time format errors
            throw new RuntimeException("Invalid time format. Please use HH:mm.");
        }
    }


    @Override
    public AccountResponse getAccountByUserId(Long userId) {
        AccountEntity account = accountRepository.findByUser(userRepository.findById(userId).get()).orElseThrow(() -> new EntityNotFoundException("Account ID not found"));
        return new AccountResponse(account.getId(), account.getBalance(), account.getMaxDaily(), account.getMaxWeekly(), account.getMaxMonthly(), account.getSpendingLimit(), account.getRestrictionStart(), account.getRestrictionEnd(), account.getUser());
    }

}