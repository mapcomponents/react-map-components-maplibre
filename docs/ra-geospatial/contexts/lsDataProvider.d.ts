/**
 * Respond to react-admin data queries using a local database persisted in localStorage
 *
 * Useful for local-first web apps. The storage is shared between tabs.
 *
 * @example // initialize with no data
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider.tsx = localStorageDataProvider();
 *
 * @example // initialize with default data (will be ignored if data has been modified by user)
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider.tsx = localStorageDataProvider({
 *   defaultData: {
 *     posts: [
 *       { id: 0, title: 'Hello, world!' },
 *       { id: 1, title: 'FooBar' },
 *     ],
 *     comments: [
 *       { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *       { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *     ],
 *   }
 * });
 */
export default function localStorageDataProvider(params: any): {
    getList: (resource: any, params: any) => Promise<import('react-admin').GetListResult<any> | {
        data: never[];
        total: number;
    }>;
    getOne: (resource: any, params: any) => Promise<import('react-admin').GetOneResult<any>>;
    getMany: (resource: any, params: any) => Promise<import('react-admin').GetManyResult<any>>;
    getManyReference: (resource: any, params: any) => Promise<import('react-admin').GetManyReferenceResult<any> | {
        data: never[];
        total: number;
    }>;
    update: (resource: any, params: any) => Promise<import('react-admin').UpdateResult<any>>;
    updateMany: (resource: any, params: any) => Promise<import('react-admin').UpdateManyResult<any>>;
    create: (resource: any, params: any) => Promise<import('react-admin').CreateResult<any>>;
    delete: (resource: any, params: any) => Promise<import('react-admin').DeleteResult<any>>;
    deleteMany: (resource: any, params: any) => Promise<import('react-admin').DeleteManyResult<any>>;
};
//# sourceMappingURL=lsDataProvider.d.ts.map