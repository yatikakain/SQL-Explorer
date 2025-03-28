export const sampleQueries = [
    {
      id: 1,
      name: 'High Salary Employees',
      query: 'SELECT * FROM employees WHERE salary > 70000',
      dataset: 'employees'
    },
    {
      id: 2,
      name: 'Electronics Products',
      query: 'SELECT * FROM products WHERE category = "Electronics"',
      dataset: 'products'
    },
    {
      id: 3,
      name: 'Marketing Department',
      query: 'SELECT name, salary FROM employees WHERE department = "Marketing"',
      dataset: 'employees'
    }
  ];