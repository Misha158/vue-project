const STORAGE_KEY = 'sendGiftData';

export const saveSendGiftToLC = (data: { currentStep: number; formData: Record<string, any> }) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getSendGiftFromLC = (): {
  currentStep: number;
  formData: Record<string, any>;
} | null => {
  const data = localStorage.getItem(STORAGE_KEY) || null;

  return data ? JSON.parse(data) : null;
};

export const deleteSendGiftFromLC = () => {
  return localStorage.removeItem(STORAGE_KEY);
};
