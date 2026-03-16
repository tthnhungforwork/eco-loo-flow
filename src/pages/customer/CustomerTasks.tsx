import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Clock, User } from "lucide-react";

const myTasks = [
  { id: 1, title: "Vệ sinh NVS Tầng 3 - Tòa A", assignee: "Tôi", deadline: "16/03/2026", status: "processing" },
  { id: 2, title: "Kiểm tra hệ thống thoát nước", assignee: "Tôi", deadline: "17/03/2026", status: "new" },
  { id: 3, title: "Bảo trì thiết bị vệ sinh", assignee: "Tôi", deadline: "15/03/2026", status: "done" },
];

const assignedTasks = [
  { id: 4, title: "Khử mùi NVS Sảnh B", assignee: "Nguyễn Văn A", deadline: "18/03/2026", status: "processing" },
  { id: 5, title: "Thay bình xà phòng tầng 5", assignee: "Trần Thị B", deadline: "19/03/2026", status: "new" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const CustomerTasks = () => {
  const [tab, setTab] = useState(0);
  const tasks = tab === 0 ? myTasks : assignedTasks;

  return (
    <div>
      <MobileHeader title="Công việc" />
      <div className="py-4 animate-fade-in">
        <SegmentedControl tabs={["Việc của tôi", "Việc tôi giao"]} active={tab} onChange={setTab} />
        <div className="px-4 space-y-3">
          {tasks.map((t) => (
            <div key={t.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm text-foreground flex-1 mr-2">{t.title}</p>
                <StatusBadge status={t.status} label={statusLabel[t.status]} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User size={12} />{t.assignee}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{t.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTasks;
