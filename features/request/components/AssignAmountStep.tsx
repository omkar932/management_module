import { useState } from "react";
import { RequestState, RequestRow } from "../request.types";

interface AssignAmountStepProps {
  request: RequestState;
  setRequest: React.Dispatch<React.SetStateAction<RequestState>>;
  next: () => void;
}

export default function AssignAmountStep({
  request,
  setRequest,
  next,
}: AssignAmountStepProps) {
  const [search, setSearch] = useState("");

  const updateAmount = (id: number, amount: number | undefined) => {
    setRequest((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === id ? { ...u, amount } : u)),
    }));
  };

  const filteredUsers = request.users
    .filter((u) => u.isApprover)
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      {filteredUsers.map((u: RequestRow) => (
        <div key={u.id} className="flex justify-between border p-2 mb-2">
          <span>{u.name}</span>

          <input
            type="number"
            value={u.amount ?? ""}
            onChange={(e) => updateAmount(u.id, Number(e.target.value))}
            className="border p-1 w-24"
          />
        </div>
      ))}

      <button className="border px-4 py-2 mt-4" onClick={next}>
        Next
      </button>
    </>
  );
}
