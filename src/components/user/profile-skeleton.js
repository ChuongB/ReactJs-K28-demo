import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const ProfileSkeleton = () => {
  return (
    <Card>
      <CardContent style={{padding:"30px"}}>
        <Stack spacing={2}>
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileSkeleton;
