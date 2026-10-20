/**
 * components/common/FeedbackTimeline.jsx
 *
 * Visual progress stepper tracking complaint lifecycle:
 *   Stage 1: Pending (Received & Queued)
 *   Stage 2: In Progress (On-site Investigation & Remediation)
 *   Stage 3: Resolved (Action Complete & Case Closed)
 *
 * Props:
 *   status     {string}  - 'pending' | 'in_progress' | 'resolved'
 *   createdAt  {string}  - Timestamp of submission
 *   updatedAt  {string}  - Timestamp of latest status change
 */
import { Check, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

const STAGES = [
  {
    key: 'pending',
    stepNumber: 1,
    title: 'Pending Review',
    description: 'Complaint registered and queued for liaison review',
  },
  {
    key: 'in_progress',
    stepNumber: 2,
    title: 'In Progress',
    description: 'Under contractor investigation & mitigation action',
  },
  {
    key: 'resolved',
    stepNumber: 3,
    title: 'Resolved',
    description: 'Corrective action implemented and case concluded',
  },
];

const ORDER = {
  pending: 1,
  in_progress: 2,
  resolved: 3,
};

export default function FeedbackTimeline({ status = 'pending', createdAt, updatedAt }) {
  const currentStep = ORDER[status] || 1;

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {STAGES.map((stage) => {
          const isCompleted = currentStep > stage.stepNumber;
          const isCurrent   = currentStep === stage.stepNumber;
          const isUpcoming  = currentStep < stage.stepNumber;

          return (
            <div
              key={stage.key}
              className={`rounded-2xl p-4 border transition-all ${
                isCurrent
                  ? 'bg-teal-50/50 border-teal-400 ring-2 ring-teal-400/20 shadow-sm'
                  : isCompleted
                  ? 'bg-emerald-50/30 border-emerald-300'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-teal-600 text-white font-extrabold shadow-sm'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check size={14} /> : stage.stepNumber}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {stage.title}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">
                      Current Stage
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-2">
                {stage.description}
              </p>

              {/* Timestamp cues */}
              <div className="text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                {stage.key === 'pending' && createdAt && (
                  <span>Logged: {formatDate(createdAt)}</span>
                )}
                {stage.key === status && status !== 'pending' && updatedAt && (
                  <span>Updated: {formatDate(updatedAt)}</span>
                )}
                {isUpcoming && <span>Pending previous steps</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
