const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;

/**
 * js file and jsx file often treated as same , but for convention people
 * use jsx when there is ui stuff which is realated to js , and when there is
 * only logic we use js
 */
