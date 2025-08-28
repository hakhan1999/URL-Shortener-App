import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <div className="bg-white/20 fixed top-0 left-0 w-full h-full">
          <div className="fixed top-1/2 left-1/2">
            <Loader2 className="animate-spin w-full flex items-center justify-center" />
            <br />
            Redirecting...
          </div>
        </div>
      </>
    );
  }
};

export default RedirectLink;
