import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";

const DoctorsManagementLoading = () => {
  return (
    <ManagementPageLoading
      columns={10}
      hasActionButton
      filterCount={4}
      filterWidths={["w-48", "w-32", "w-40", "w-24"]}
    />
  );
};

export default DoctorsManagementLoading;
