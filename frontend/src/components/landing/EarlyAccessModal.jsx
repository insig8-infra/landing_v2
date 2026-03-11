import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const EarlyAccessModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/early-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company: company || null, role: role || null }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const resetAndClose = () => {
    setEmail('');
    setCompany('');
    setRole('');
    setStatus('idle');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          data-testid="early-access-modal-backdrop"
          onClick={resetAndClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md rounded-2xl bg-surface-raised border border-white/5 p-6 sm:p-8 shadow-2xl"
            data-testid="early-access-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/5 text-muted hover:text-display transition-colors"
              data-testid="modal-close-btn"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {status === 'success' ? (
              <div className="text-center py-8" data-testid="modal-success">
                <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-xl text-display mb-2">You're on the list!</h3>
                <p className="text-body-sm text-support">{message}</p>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-semibold text-xl text-display mb-2">Get Early Access</h3>
                <p className="text-body-sm text-support mb-6">
                  Join the waitlist and be among the first to experience insig8.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-support mb-1.5" htmlFor="ea-email">
                      Work email *
                    </label>
                    <input
                      id="ea-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-base border border-white/10 text-display text-sm placeholder:text-muted focus:border-brand-primary/50 transition-colors"
                      data-testid="modal-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-support mb-1.5" htmlFor="ea-company">
                      Company
                    </label>
                    <input
                      id="ea-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-base border border-white/10 text-display text-sm placeholder:text-muted focus:border-brand-primary/50 transition-colors"
                      data-testid="modal-company-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-support mb-1.5" htmlFor="ea-role">
                      Role
                    </label>
                    <input
                      id="ea-role"
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. CS Lead, Founder"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-base border border-white/10 text-display text-sm placeholder:text-muted focus:border-brand-primary/50 transition-colors"
                      data-testid="modal-role-input"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-400" data-testid="modal-error">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    className="w-full py-3 rounded-full bg-gradient-hero-focus text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    data-testid="modal-submit-btn"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Join the Waitlist'
                    )}
                  </button>
                </form>
                <p className="text-[11px] text-muted text-center mt-4">
                  We'll never share your email. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
