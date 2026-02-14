import { RequestState } from "../request.types";

interface RequestFormStepProps {
  request: RequestState;
  setRequest: React.Dispatch<React.SetStateAction<RequestState>>;
  next: () => void;
}

export default function RequestFormStep({
  request,
  setRequest,
  next,
}: RequestFormStepProps) {
  return (
    <div className="space-y-3">
      <input
        placeholder="Name"
        className="border p-2 w-full"
        onChange={(e) => setRequest({ ...request, name: e.target.value })}
      />

      <select
        className="border p-2 w-full"
        onChange={(e) => setRequest({ ...request, accountId: e.target.value })}
      >
        <option value="">Select Account Id</option>
        <option value="1001">1001</option>
        <option value="1002">1002</option>
      </select>

      <select
        className="border p-2 w-full"
        onChange={(e) => setRequest({ ...request, docType: e.target.value })}
      >
        <option>TV</option>
        <option>Fridge</option>
        <option>Book</option>
      </select>

      <button className="border px-4 py-2" onClick={next}>
        Next
      </button>
    </div>
  );
}
