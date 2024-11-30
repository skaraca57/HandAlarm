// navigationTypes.ts

export interface Photo {
    uri: string;
    date: string;
}

// Existing definitions
export interface Alarm {
    id: string;
    job: string;
    time: string;
    date: string;
}

export type TabParamList = {
    Upload: undefined;
    Processed: undefined;
    Gallery: undefined;
    Agenda: { alarms: Alarm[] };
};
