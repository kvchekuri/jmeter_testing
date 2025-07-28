import type { EventProperties } from '~/types/events';
import * as actionTypes from './actionTypes';
import type { UpdatedEventFields } from '~/types/events';

//get all events
export const fetchEvents = () => ({
    type: actionTypes.FETCH_EVENTS_REQUEST,
});

export const fetchEventsSuccess = (events: EventProperties[]) => ({
    type: actionTypes.FETCH_EVENTS_SUCCESS,
    payload: events,
});

export const fetchEventsFailure = (error: string) => ({
    type: actionTypes.FETCH_EVENTS_FAILURE,
    payload: error,
});

//create event
export const createEvent = (newEvent: EventProperties) => ({
    type: actionTypes.CREATE_EVENT_REQUEST,
    payload: newEvent,
});

export const createEventSuccess = (createdEvent: EventProperties) => ({
    type: actionTypes.CREATE_EVENT_SUCCESS,
    payload: createdEvent,
});


export const createEventFailure = (error: string) => ({
    type: actionTypes.CREATE_EVENT_FAILURE,
    payload: error,
});

//update event
export const updateEvent = (event: UpdatedEventFields) => ({
    type: actionTypes.UPDATE_EVENT_REQUEST,
    payload: event,
});

export const updateEventSuccess = (event: EventProperties) => ({
    type: actionTypes.UPDATE_EVENT_SUCCESS,
    payload: event,
});

export const updateEventFailure = (error: string) => ({
    type: actionTypes.UPDATE_EVENT_FAILURE,
    payload: error,
});

//delete event
export const deleteEvent = (eventId: number) => ({
    type: actionTypes.DELETE_EVENT_REQUEST,
    payload: eventId,
});

export const deleteEventSuccess = (eventId: number) => ({
    type: actionTypes.DELETE_EVENT_SUCCESS,
    payload: eventId,
});

export const deleteEventFailure = (error: string) => ({
    type: actionTypes.DELETE_EVENT_FAILURE,
    payload: error,
});