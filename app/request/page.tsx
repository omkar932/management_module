"use client";
import { RequestState } from "@/features/request/request.types";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/features/request/request.service";

import RequestFormStep from "@/features/request/components/RequestFormStep";
import ApproverSelectionStep from "@/features/request/components/ApproverSelectionStep";
import AssignAmountStep from "@/features/request/components/AssignAmountStep";
import RequestSummaryStep from "@/features/request/components/RequestSummaryStep";

import WorkflowHeader from "@/components/WorkflowHeader";

export default function RequestPage() {
  const [step, setStep] = useState(1);

  const totalSteps = 4;

  const [request, setRequest] = useState<RequestState>({
    name: "",
    accountId: "",
    docType: "TV",
    users: [],
  });

  useEffect(() => {
    fetchUsers().then((users) => {
      setRequest((prev: RequestState) => ({
        ...prev,
        users: users.map((u: { id: number; name: string }) => ({
          ...u,
          isApprover: false,
          amount: 0,
        })),
      }));
    });
  }, []);

  return (
    <div className="min-h-screen flex justify-center py-8">
      <div className="w-full max-w-xl border p-6">
        <WorkflowHeader currentStep={step} totalSteps={totalSteps} />


        {step === 1 && (
          <RequestFormStep
            request={request}
            setRequest={setRequest}
            next={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ApproverSelectionStep
            request={request}
            setRequest={setRequest}
            next={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <AssignAmountStep
            request={request}
            setRequest={setRequest}
            next={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <RequestSummaryStep
            request={request}
            setRequest={setRequest}
            backToAmount={() => setStep(3)}
          />
        )}
      </div>
    </div>
  );
}
