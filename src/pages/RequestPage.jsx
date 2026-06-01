import ShellSkeleton from '../components/_ShellSkeleton.jsx';

export default function RequestPage() {
  return (
    <ShellSkeleton
      kicker="FED // FILE A REQUEST"
      title="FILE A REQUEST"
      note="The official intake form (sections A–D, clearance meter, URGENT flag, RECEIVED receipt) is in preparation."
      status="INTAKE OPEN"
      chromeRight="FORM FED-S023"
    />
  );
}
