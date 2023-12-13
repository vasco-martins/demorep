"use client";
import CollectorWrapper from "@/components/dashboard/collector/collectorWrapper";

interface CollectorPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: CollectorPageProps) {
  const { id } = params;
  return (
    <CollectorWrapper params={{ id: id, active: "general" }}>
      awd
    </CollectorWrapper>
  );
}
