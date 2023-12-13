"use client";
import CollectorDialog from "@/components/dashboard/collectorDialog";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Collector } from "@prisma/client";
import { MessageSquare, VideoIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Page() {
  const { data: session, status } = useSession();
  const [collectors, setCollectors] = useState(null);
  async function getCollectors() {
    const response = await fetch("/api/collectors", {
      method: "POST",
      body: JSON.stringify({
        email: session?.user.email,
      }),
    });
    const body = await response.json();
    setCollectors(body);
  }

  useEffect(() => {
    getCollectors();
  }, [status]);

  return (
    <div>
      <Navbar />

      <section className="collectors m-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl font-bold ">Coletores</h1>

          <CollectorDialog
            onSubmit={() => {
              getCollectors();
            }}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {collectors ? (
            collectors.map((collector: Collector) => (
              <Link
                href={`/dashboard/collector/${collector.id}`}
                className="border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between"
              >
                <h2 className=" text-base">{collector.name}</h2>
                <div className="flex items-center gap-4">
                  {collector.textCollect && <MessageSquare color="green" />}
                  {collector.textCollect && <VideoIcon color="green" />}
                </div>
              </Link>
            ))
          ) : (
            <Skeleton className="w-[250px] h-12" />
          )}
        </div>
      </section>
    </div>
  );
}
