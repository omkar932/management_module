import { useState } from "react";
import { RequestState, RequestRow } from "../request.types";

interface RequestSummaryStepProps {
  request: RequestState;
  setRequest: React.Dispatch<React.SetStateAction<RequestState>>;
  backToAmount: () => void;
}

export default function RequestSummaryStep({
  request,
  setRequest,
  backToAmount,
}: RequestSummaryStepProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const finalUsers = request.users.filter(
    (u: RequestRow) => u.isApprover && (u.amount ?? 0) > 0,
  );

  const updateAmount = (id: number, amount: number) => {
    setRequest((prev: RequestState) => ({
      ...prev,
      users: prev.users.map((u: RequestRow) =>
        u.id === id ? { ...u, amount } : u,
      ),
    }));
  };

  const deleteUser = (id: number) => {
    setRequest((prev: RequestState) => ({
      ...prev,
      users: prev.users.map((u: RequestRow) =>
        u.id === id ? { ...u, amount: 0 } : u,
      ),
    }));
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h3>Summary</h3>
      </div>

      <div className="border p-3 mb-4 text-sm">
        <p>
          <b>Name:</b> {request.name}
        </p>
        <p>
          <b>Account:</b> {request.accountId}
        </p>
        <p>
          <b>DocType:</b> {request.docType}
        </p>
      </div>
      <div className="w-full flex justify-end mb-2">
        <button className="border px-3" onClick={backToAmount}>
          + Add More Users
        </button>
      </div>
      {finalUsers.map((u: RequestRow) => (
        <div key={u.id} className="flex justify-between border p-2 mb-2">
          <span>{u.name}</span>

          <div className="flex gap-2">
            {editingId === u.id ? (
              <>
                <input
                  type="number"
                  value={u.amount}
                  onChange={(e) => updateAmount(u.id, Number(e.target.value))}
                  className="border p-1 w-24"
                />
                <button
                  className="border px-2"
                  onClick={() => setEditingId(null)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>₹{u.amount}</span>
                <button
                  className="border px-2"
                  onClick={() => setEditingId(u.id)}
                >
                  Edit
                </button>
              </>
            )}

            <button className="border px-2" onClick={() => deleteUser(u.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
