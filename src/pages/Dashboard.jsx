import { FilterIcon, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Error from "@/components/Error";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/context/context";
import { getClicksForUrls } from "@/db/apiClicks";
import LinkCard from "@/components/LinkCard";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoading = loading || loadingClicks;

  return (
    <>
      {isLoading ? (
        <div className="bg-white/20 fixed top-0 left-0 w-full h-full">
          <div className="fixed top-1/2 left-1/2">
            <Loader2 className="animate-spin w-full flex items-center justify-center" />
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Links Created</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{urls ? urls.length : 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{clicks ? clicks.length : 0}</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-between mt-10">
            <h1 className="text-4xl font-extrabold">My Links</h1>
            <Button>Create Link</Button>
          </div>
          <div className="relative mt-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Filter Links..."
            />
            <FilterIcon className="absolute top-2 right-2 p-1" />
          </div>
          {error && <Error message={error?.message} />}
          {(filteredUrls || []).map((url, id) => (
            <LinkCard key={id} url={url} fetchUrls={fnUrls} />
          ))}
        </>
      )}
    </>
  );
};

export default Dashboard;
