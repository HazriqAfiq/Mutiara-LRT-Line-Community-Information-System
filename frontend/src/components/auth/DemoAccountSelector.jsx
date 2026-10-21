/**
 * components/auth/DemoAccountSelector.jsx
 *
 * Minimalist demo account selector:
 * Two compact clickable cards for Resident User and Project Officer.
 */
import { User, ShieldCheck, Check } from 'lucide-react';

export default function DemoAccountSelector({ selectedRole, onSelect }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Demo Accounts
        </span>
        <span className="text-[10px] text-teal-600 font-medium">Click to auto-fill</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Resident User */}
        <button
          type="button"
          onClick={() => onSelect('user')}
          className={`p-2.5 rounded-md text-left border transition-all duration-150 cursor-pointer ${
            selectedRole === 'user'
              ? 'border-[#16A6A1] bg-teal-50/70 ring-1 ring-[#16A6A1]'
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
          }`}
          aria-pressed={selectedRole === 'user'}
        >
          <div className="flex items-center justify-between mb-0.5">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-1">
              <User size={13} className="text-[#16A6A1]" />
              Resident
            </span>
            {selectedRole === 'user' && <Check size={12} className="text-[#16A6A1]" />}
          </div>
          <p className="text-[10px] text-slate-500 font-mono truncate">user@demo.test</p>
        </button>

        {/* Project Officer */}
        <button
          type="button"
          onClick={() => onSelect('admin')}
          className={`p-2.5 rounded-md text-left border transition-all duration-150 cursor-pointer ${
            selectedRole === 'admin'
              ? 'border-[#12375B] bg-blue-50/70 ring-1 ring-[#12375B]'
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
          }`}
          aria-pressed={selectedRole === 'admin'}
        >
          <div className="flex items-center justify-between mb-0.5">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#12375B]" />
              Officer
            </span>
            {selectedRole === 'admin' && <Check size={12} className="text-[#12375B]" />}
          </div>
          <p className="text-[10px] text-slate-500 font-mono truncate">admin@demo.test</p>
        </button>
      </div>
    </div>
  );
}
