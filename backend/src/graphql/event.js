//CHANGED FOR MILESTONE 2
export const eventSchema = `#graphql
type Event {
    id: ID!
    post: ID!
    action: String!
    session: String!
    date: Float!
}

type ViewStats {
    views: Int!
}

type DailyViews {
    _id: Float!
    views: Int!
}

type DailyDurations {
    _id: Float!
    averageDuration: Float!
}

type TrackEventResponse {
    session: String!
}
`

export const eventResolver = {}
//END CHANGED FOR MILESTONE 2
