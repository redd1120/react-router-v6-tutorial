import { ActionFunctionArgs, redirect } from 'react-router';
import {
  ContactState,
  createContact,
  deleteContact,
  updateContact,
} from '../contacts';

export const createAction: () => Promise<Response> = async () => {
  const contact = (await createContact()) as ContactState;
  return redirect(`/contacts/${contact.id}/edit`);
};

export const editAction: (
  args: ActionFunctionArgs<{ request: Request; params: { contactId: string } }>
) => Promise<Response> = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export const deleteAction: (
  args: ActionFunctionArgs<{ params: { contactId: string } }>
) => Promise<Response> = async ({ params }) => {
  await deleteContact(params.contactId);
  return redirect(`/`);
};
