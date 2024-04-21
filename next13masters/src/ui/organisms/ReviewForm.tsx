export const ReviewForm = () => {
  return (
    <form data-testid="add-review-form">
      <label htmlFor="headline">Headline</label>
      <input name="headline" type="text" />

      <label htmlFor="content">Content</label>
      <input name="content" type="text" />

      <label htmlFor="rating">Rating</label>
      <input name="rating" type="number" />

      <label htmlFor="name">Name</label>
      <input name="name" type="text" />

      <label htmlFor="email">Email</label>
      <input name="email" type="email" />
    </form>
  );
};
