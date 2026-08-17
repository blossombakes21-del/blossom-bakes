import { supabase } from './supabase';

export type ActionType = 'STOCK_IN' | 'STOCK_OUT' | 'DELETE_ATTEMPT' | 'DELETE_SUCCESS' | 'ITEM_CREATED';

export const logAction = async (
  action: ActionType,
  itemName: string,
  itemId?: string | null,
  quantityChanged?: number,
  details?: string
) => {
  // In a real environment with Supabase wired:
  /*
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  
  await supabase.from('audit_logs').insert({
    user_id: session.user.id,
    action,
    item_id: itemId,
    item_name: itemName,
    quantity_changed: quantityChanged,
    details
  });
  */

  // For frontend demonstration purposes, we will mock storing this locally
  const newLog = {
    id: Math.random().toString(),
    action,
    item_id: itemId,
    item_name: itemName,
    quantity_changed: quantityChanged,
    details,
    created_at: new Date().toISOString(),
    user: 'Current User' // Mock user
  };

  const existingLogs = JSON.parse(localStorage.getItem('mock_audit_logs') || '[]');
  localStorage.setItem('mock_audit_logs', JSON.stringify([newLog, ...existingLogs]));
  
  console.log('Action logged:', newLog);
};

export const getLogs = () => {
  return JSON.parse(localStorage.getItem('mock_audit_logs') || '[]');
};
