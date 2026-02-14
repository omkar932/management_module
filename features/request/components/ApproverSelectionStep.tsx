import { RequestState, RequestRow } from "../request.types";

interface ApproverSelectionStepProps {
  request: RequestState;
  setRequest: React.Dispatch<React.SetStateAction<RequestState>>;
  next: () => void;
}

export default function ApproverSelectionStep({
  request,
  setRequest,
  next,
}: ApproverSelectionStepProps) {
  const toggleApprover = (id: number) => {
    setRequest((prev) => ({
      ...prev,
      users: prev.users.map((u) =>
        u.id === id ? { ...u, isApprover: !u.isApprover } : u
      ),
    }));
  };

  const userCards = request.users.map((user: RequestRow) => (
    <div
      key={user.id}
      className="flex justify-between border p-2 mb-2 cursor-pointer"
      onClick={() => toggleApprover(user.id)}
    >
      <span>{user.name}</span>

      <input type="checkbox" checked={user.isApprover} readOnly />
    </div>
  ));

  return (
    <>
      {userCards}

      <button className="border px-4 py-2 mt-4" onClick={next}>
        Next
      </button>
    </>
  );
}
