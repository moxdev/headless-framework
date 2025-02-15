import { ContentNodeOptions, headlessConfig } from '@wpengine/headless-core';
import { resolvePrefixedUrlPath } from '@wpengine/headless-core/utils';
import {
  usePost as useReactPost,
  useUriInfo as useReactUriInfo,
} from '@wpengine/headless-react';
import { useRouter } from 'next/router';

export interface UriInfo {
  id?: string;
  idType?: WPGraphQL.ContentNodeIdTypeEnum;
  isPostsPage?: boolean;
  isFrontPage?: boolean;
  isPreview?: boolean;
  isArchive?: boolean;
  isSingular?: boolean;
  is404?: boolean;
  uriPath: string;
}

/**
 * React Hook for retrieving information about the current URI within a Next app.
 *
 * @see useUriInfo For similar functionality outside of Next apps.
 *
 * @example
 * ```tsx
 * import { useNextUriInfo } from '@wpengine/headless';
 *
 * export function Screen() {
 *   const uriInfo = useNextUriInfo();
 *
 *   console.log(uriInfo);
 * }
 * ```
 * @export
 * @returns {(UriInfo | undefined)}
 */
export function useUriInfo(): UriInfo | undefined {
  const router = useRouter();
  let page = '';

  if (router.asPath.indexOf('[[') === -1) {
    page = router.asPath;
    page = resolvePrefixedUrlPath(page, headlessConfig().blogUrlPrefix);
  }

  return useReactUriInfo(page ?? '');
}

/* eslint-disable consistent-return */
/**
 * React Hook for retrieving the post based on the current URI. Uses window.location if necessary
 *
 * @example
 * ```tsx
 * import { usePost } from '@wpengine/headless';
 *
 * export default function Post() {
 *   const post = usePost();
 *
 *   return (
 *     <div>
 *       {post && (
 *         <div>
 *           <div>
 *             <h5>{post.title}</h5>
 *             <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
 *           </div>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * @export
 * @returns {(Post | Page | undefined)}
 */
export function usePost(
  options: ContentNodeOptions = {},
): WPGraphQL.RootQuery['post'] | WPGraphQL.RootQuery['page'] | undefined {
  const router = useRouter();
  let page = '';

  if (router.asPath.indexOf('[[') === -1) {
    page = router.asPath;
    page = resolvePrefixedUrlPath(page, headlessConfig().blogUrlPrefix);
  }

  return useReactPost(page, options);
}
/* eslint-enable consistent-return */
