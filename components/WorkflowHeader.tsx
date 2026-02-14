interface WorkflowHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function WorkflowHeader({
  currentStep,
  totalSteps,
}: WorkflowHeaderProps) {
  return (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800">Request Workflow</h1>
      <p className="text-sm text-gray-500 mt-1">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}