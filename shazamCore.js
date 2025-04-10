import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
reducerPath: 'shazamCoreApi',
baseQuery : fetchBaseQuery({
baseUrl : 'https://shazam-core.p.rapidapi.com/',
prepareHeaders : (headers) => {

        headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');
        headers.set('x-rapidapi-key','2ccdaa2299msh4238d647d690fb5p114be1jsne62492646e9a');
        return headers;
    },

   }),

   endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: ({ countryCode = 'IN' }={}) => ({
        url: 'v1/charts/world',
        params: { country_code: countryCode },
      }),
    }),

    getSongDetails: builder.query({query: ({songid}) => `v2/tracks/details?track_id=${songid}`}),

    getSongRelated :builder.query({query: ({songid,offset})=>`v1/tracks/related?track_id=${songid}&offset=${offset}`
  }),
  }), 

    

});

export const { useGetTopChartsQuery,useGetSongDetailsQuery,useGetSongRelatedQuery, } = shazamCoreApi;