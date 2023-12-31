import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

export interface ContactState {
  id: string;
  createdAt: number;
  first?: string;
  last?: string;
  favorite?: boolean;
  avatar?: string;
  notes?: string;
  twitter?: string;
}

export async function getContacts(query: string | null) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: ContactState[] | null = await localforage.getItem('contacts');
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
  }
  return contacts.sort(sortBy('last', 'createdAt'));
}

export async function createContact() {
  await fakeNetwork('');
  const id = Math.random().toString(36).substring(2, 9);
  const contact: ContactState = { id, createdAt: Date.now() };
  const contacts = await getContacts('');
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string | undefined) {
  await fakeNetwork(`contact:${id}`);
  const contacts: ContactState[] | null = await localforage.getItem('contacts');
  const contact = contacts?.find((contact: ContactState) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id: string | undefined, updates: unknown) {
  await fakeNetwork('');
  const contacts = (await localforage.getItem('contacts')) as ContactState[];
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error(`No contact found for ${id}`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string | undefined) {
  const contacts = (await localforage.getItem('contacts')) as ContactState[];
  const index = contacts.findIndex(
    (contact: ContactState) => contact.id === id
  );
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: ContactState[]) {
  return localforage.setItem('contacts', contacts);
}

interface FakeCache {
  [index: string]: boolean;
}
// fake a cache so we don't slow down stuff we've already seen
let fakeCache: FakeCache = {};

async function fakeNetwork(key: string) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
