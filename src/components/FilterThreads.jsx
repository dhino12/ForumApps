/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
function FilterThreads({ onFilter, threads, params }) {
    const onFilterCategories = (event) => {
      onFilter(event.target.value);
    };

    return (
      <select onChange={onFilterCategories} value={params}>
        <option value="all">All</option>
        {
            threads.map((thread) => (
              <option
                value={thread.category}
                key={thread.id}
              >
                {thread.category}
              </option>
            ))
        }
      </select>
    );
}

export default FilterThreads;
