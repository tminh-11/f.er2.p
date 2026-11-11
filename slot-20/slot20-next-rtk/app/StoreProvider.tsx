'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';
import { hydrate } from '@/lib/actions';
import { loadState, saveState, selectPersisted } from '@/lib/persist';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    const saved = loadState();
    if (saved) store.dispatch(hydrate(saved));

    const unsubscribe = store.subscribe(() => {
      saveState(selectPersisted(store.getState()));
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
