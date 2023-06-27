import { ValidationError, useForm } from "@formspree/react";
import { Section } from "./Section";

export const ContactSection = () => {
  const [state, handleSubmit] = useForm("mayzgjbd");
  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold bg-purple-700 p-2 inline-block rounded text-white sectionHeading">
        Contact me
      </h2>
      <div className="mt-8 p-3 md:p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full h-fit">
        {state.succeeded ? (
          <p className="text-white text-center">Thanks for your message !</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="font-medium text-white block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 p-3"
            />
            <label
              htmlFor="email"
              className="font-medium text-white block mb-1 mt-4 md:mt-8"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label
              htmlFor="email"
              className="font-medium text-white block mb-1 mt-4 md:mt-8"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="h-20 md:h-32 block w-full rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />
            <button
              disabled={state.submitting}
              className="bg-purple-600 text-white py-2 md:py-4 px-4 md:px-8 rounded-lg font-bold text-lg mt-6 md:mt-16 "
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
