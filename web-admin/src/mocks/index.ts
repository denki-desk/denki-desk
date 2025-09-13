export async function enableMocking() {
  // TODO: we'll disable mocking by default when we added env variables
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  const { worker } = await import('./browser');
  const { initializeDb } = await import('./db');
  const { runSeeders } = await import('./seeders');

  if (typeof window !== 'undefined') {
    const isSeeded = window.localStorage.getItem(`denki_desk_mock_db_seeded`);

    if (!isSeeded) {
      runSeeders();
      window.localStorage.setItem('denki_desk_mock_db_seeded', 'true');
    } else {
      initializeDb();
    }
  }

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
