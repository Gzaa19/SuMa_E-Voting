import { useCallback, useState } from 'react';

export default function useAlert() {
  const [state, setState] = useState({ visible: false, title: '', message: '', actions: [] });

  const hideAlert = useCallback(() => {
    setState((s) => ({ ...s, visible: false }));
  }, []);

  const showAlert = useCallback((title, message, actions = [{ text: 'OK' }]) => {
    setState({ visible: true, title, message, actions });
  }, []);

  const alertProps = {
    visible: state.visible,
    title: state.title,
    message: state.message,
    actions: state.actions,
    onRequestClose: hideAlert,
  };

  return { showAlert, hideAlert, alertProps };
}
