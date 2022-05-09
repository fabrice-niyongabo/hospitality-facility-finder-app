import React from "react";
import { Skeleton } from "@mui/material";

function FacilitySkeleton() {
  return (
    <div className="row">
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          className="my-3"
          style={{ borderRadius: 5 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          className="my-3"
          style={{ borderRadius: 5 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          className="my-3"
          style={{ borderRadius: 5 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          className="my-3"
          style={{ borderRadius: 5 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          className="my-3"
          style={{ borderRadius: 5 }}
          animation="wave"
        />
      </div>
      <div className="col-md-4">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          className="my-2"
          style={{ borderRadius: 20 }}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          className="my-3"
          style={{ borderRadius: 5 }}
          animation="wave"
        />
      </div>
    </div>
  );
}

export default FacilitySkeleton;
