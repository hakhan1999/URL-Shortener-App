import { Copy, Download, Loader2, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";

const LinkCard = ({ url, fetchUrls }) => {
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

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg mt-5">
      <img
        src={url?.qr}
        className="h-35 object-contain ring-blue-500 ring self-start"
        alt="QR code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 gap-1">
        <span className="text-3xl font-extrabold hover:underline cusrsor-pointer">
          {url?.title}
        </span>
        <span className="text-xl text-blue-400 font-medium hover:underline cusrsor-pointer">
          {domain}
          {url?.custom_url ?? url.short_url}
        </span>
        <span className="flex items-center gap-1 font-medium hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex flex-1 font-normal text-sm items-end">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="cursor-pointer bg-[#020618]"
          onClick={() => {
            navigator.clipboard.writeText(`${domain}${url?.short_url}`);
          }}
        >
          <Copy />
        </Button>
        <Button
          variant="ghost"
          className="cursor-pointer bg-[#020618]"
          onClick={downloadQr}
        >
          <Download />
        </Button>
        <Button
          variant="ghost"
          className="cursor-pointer bg-[#020618]"
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
          {loadingDelete ? <Loader2 className="animate-spin" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
