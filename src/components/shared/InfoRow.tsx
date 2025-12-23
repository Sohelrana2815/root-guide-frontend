function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">
        {value === undefined || value === null || value === "" ? "N/A" : value}
      </p>
    </div>
  );
}

export default InfoRow;
