import Skeleton from "react-loading-skeleton";

export default function SkeletonCard() {
  return (
    <>
      <Skeleton height={150} width={110} />
      <Skeleton width={110} />
    </>
  );
}
