document.getElementById('verifyUser').addEventListener('click', () => {
  const baseURL = "https://api.baserow.io/api/database/rows/table/272387/";
  const token = "vm2x3AtENkNTiLuuZE7xKM63EyJhB2LU";
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  axios.get(baseURL, {
      headers: {
          Authorization: `Token ${token}`
      },
      params: {
          // Substitua 'field_123' e 'field_456' pelos IDs dos campos de username e senha na sua tabela
          search: username,
      }
  })
  .then(function (response) {
      console.log("Dados recebidos:", response.data);
      const users = response.data.results;
      
      // Verifica se existe algum usuário que corresponde ao username, à senha, e está ativo
      let userFoundAndActive = users.find(user => user.field_1943613 === username && user.field_1943614 === password && user.field_1943615 === true);

      if (userFoundAndActive) {
          alert('Usuário verificado com sucesso!');
          window.location.href = 'login.html'; // Caminho relativo de 'index.html' para 'login.html'
        } else {
          // Se um usuário foi encontrado mas não está ativo, você pode personalizar esta mensagem
          if (users.some(user => user.field_1943613 === username && user.field_1943614 === password)) {
              alert('Usuário encontrado, mas não está ativo.');
          } else {
              alert('Usuário ou senha incorretos.');
          }
      }
  })
  .catch(function (error) {
      console.log(error);
      alert('Erro ao verificar usuário. Veja o console para mais detalhes.');
  });

});
