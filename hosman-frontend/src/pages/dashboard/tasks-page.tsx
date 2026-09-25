import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { TasksView } from 'src/sections/tasks/view/tasks-view';

const metadata = { title: `Task Manager | ${CONFIG.appName}` };

export default function TasksPage() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <TasksView />
    </>
  );
}
