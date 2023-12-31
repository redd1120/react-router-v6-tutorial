import { LoaderFunctionArgs } from 'react-router';
import { ContactState, getContact, getContacts } from '../contacts';

export type Contacts = {
  contacts: ContactState[];
  q: string;
};

export const rootLoader: (
  args: LoaderFunctionArgs<{ request: Request }>
) => Promise<{
  contacts: ContactState[];
}> = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
};

export const contactLoader: (
  args: LoaderFunctionArgs<{
    params: { contactId: string };
  }>
) => Promise<{ contact: ContactState | null }> = async ({ params }) => {
  const contact = await getContact(params.contactId);
  return { contact };
};
