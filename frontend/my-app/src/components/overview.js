import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "@/components/ui/bar";
import { getAccount, getIdUser } from "@/actions";
import { viewDependents } from "@/actions"; // Assuming this function is in the same file or imported

export function Overview({ guardianId }) {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [dependents, setDependents] = useState([]);
  const [dependentAccounts, setDependentAccounts] = useState({}); // Store accounts for each dependent

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data
        const userData = await getIdUser();
        setUser(userData);

        // Fetch guardian account data
        const accountData = await getAccount(guardianId);
        setAccount(JSON.parse(accountData));

        // Fetch dependents data
        const dependentsData = await viewDependents(guardianId);
        setDependents(dependentsData); // Set the dependents' data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [guardianId]);

  useEffect(() => {
    async function fetchDependentAccounts() {
      try {
        const accounts = {};
        for (const dependent of dependents) {
          const accountData = await getAccount(dependent.id); // Fetch each dependent's account data
          accounts[dependent.id] = JSON.parse(accountData); // Store the account in the state
        }
        setDependentAccounts(accounts);
      } catch (error) {
        console.error("Error fetching dependent accounts:", error);
      }
    }

    if (dependents.length > 0) {
      fetchDependentAccounts(); // Fetch dependent accounts once dependents are set
    }
  }, [dependents]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Guardian Account */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {user ? user.sub : "Loading..."}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {account ? `KWD ${account.balance}` : "Loading..."}
          </div>
          <Bar className="h-[60px]" />
          <p className="text-xs text-muted-foreground">
            +2.25% period of change
          </p>
        </CardContent>
      </Card>

      {/* Dynamically Render Dependents */}
      {dependents.map((dependent) => (
        <Card key={dependent.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dependent.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dependentAccounts[dependent.id]
                ? `KWD ${dependentAccounts[dependent.id].balance}`
                : "Loading..."}
            </div>
            <Bar className="h-[60px]" />
            <p className="text-xs text-muted-foreground">
              {dependentAccounts[dependent.id]
                ? "+3.25% period of change"
                : "Loading..."}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
