import { Button } from "@/components/ui/button";
import { UrlState } from "@/context/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Loader2, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Location from "@/components/Location";
import DeviceStats from "@/components/DeviceStats";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState;
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  const domain = import.meta.env.VITE_APP_DOMAIN_URL;

  const downloadQr = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      {loading ||
        (loadingStats && (
          <div className="bg-white/20 fixed top-0 left-0 w-full h-full">
            <div className="fixed top-1/2 left-1/2">
              <Loader2 className="animate-spin w-full flex items-center justify-center" />
            </div>
          </div>
        ))}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-6 rounded-lg sm:w-2/5">
          <span className="text-3xl font-extrabold">{url?.title}</span>
          <a
            className="flex items-center gap-2 text-2xl sm:text-xl text-blue-400 font-bold hover:underline cursor-pointer"
            target="_blank"
            href={`${domain}${link}`}
          >
            <LinkIcon />
            {`${domain}${link}`}
          </a>
          <a
            target="_blank"
            href={url?.original_url}
            className="flex items-start gap-2 hover:underline cursor-pointer"
          >
            <LinkIcon />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "Asia/Karachi",
            })}{" "}
            {new Date(url?.created_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Karachi",
            })}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="cursor-pointer bg-[#0f172b]"
              onClick={() => {
                navigator.clipboard.writeText(`${domain}${url?.short_url}`);
              }}
            >
              <Copy />
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer bg-[#0f172b]"
              onClick={downloadQr}
            >
              <Download />
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer bg-[#0f172b]"
              onClick={() => fnDelete()}
            >
              {loadingDelete ? <Loader2 className="animate-spin" /> : <Trash />}
            </Button>
          </div>
          <img
            src={url?.qr}
            alt="QR Code"
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
          />
        </div>
        <div className="sm:w-3/5">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold">Stats</CardTitle>
            </CardHeader>
            {stats && stats.length ? (
              <CardContent className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{stats?.length}</p>
                  </CardContent>
                </Card>

                <CardTitle>Location Data</CardTitle>
                <Location stats={stats} />
                <CardTitle>Device Info</CardTitle>
                <DeviceStats stats={stats} />
              </CardContent>
            ) : (
              <CardContent>
                {loadingStats === false
                  ? "No Statistics yet"
                  : "Loading Statistics.."}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Link;
