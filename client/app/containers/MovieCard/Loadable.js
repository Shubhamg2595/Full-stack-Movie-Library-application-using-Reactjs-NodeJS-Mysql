/**
 *
 * Asynchronously loads the component for MovieCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
