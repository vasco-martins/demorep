import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Collector } from "@prisma/client";
import { ChevronLeft, Globe, VideoIcon, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface CollectorPageProps {
  children: React.ReactNode;
  params: {
    id: string;
    active: string;
  };
}

export default function CollectorWrapper({
  children,
  params,
}: CollectorPageProps) {
  const { id, active } = params;
  const [collector, setCollector] = useState<Collector | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Fetch collector from API
    fetch(`/api/collectors/get/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCollector(data);
        } else {
          router.push("/404");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <main>
      <Navbar />
      <div className="m-8">
        <Link href="/dashboard/">
          <div className="flex text-base">
            <ChevronLeft />
            <p className="text-base">Voltar</p>
          </div>
        </Link>
        <h1 className="text-4xl font-bold">{collector?.name}</h1>
        <div className="grid grid-cols-6 mt-12 min-h-md">
          <div className="flex flex-col col-span-1 justify-center border-r border-gray-300 pr-4 space-y-4">
            <Link
              className={`hover:bg-slate-100 ${
                active === "general" && "bg-slate-100"
              } p-2 rounded-md`}
              href={`/dashboard/collector/${collector?.id}`}
            >
              <span className="flex gap-4 cursor-pointer">
                <Globe color="green" />
                Geral
              </span>
            </Link>
            {collector?.videoCollect && (
              <Link
                className={`hover:bg-slate-100 ${
                  active === "video" && "bg-slate-100"
                } p-2 rounded-md`}
                href={`/dashboard/collector/${collector?.id}/video`}
              >
                <span className="flex gap-4 cursor-pointer">
                  <VideoIcon color="green" />
                  Vídeos
                </span>
              </Link>
            )}

            {collector?.textCollect && (
              <Link
                className={`hover:bg-slate-100 ${
                  active === "text" && "bg-slate-100"
                } p-2 rounded-md`}
                href={`/dashboard/collector/${collector.id}/text`}
              >
                <span className="flex gap-4 cursor-pointer">
                  <MessageSquare color="green" />
                  Mensagens de Texto
                </span>
              </Link>
            )}

            <Link
              className={`hover:bg-slate-100 ${
                active === "form" && "bg-slate-100"
              } p-2 rounded-md`}
              href={`/dashboard/collector/${collector?.id}/form`}
            >
              <span className="flex gap-4 cursor-pointer">
                <Settings color="green" />
                Definições
              </span>
            </Link>
          </div>
          <div className="col-span-5 pl-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
