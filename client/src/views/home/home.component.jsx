
import {
  useEffect
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  useState
} from 'react'
import {
  getByName,
  getUsers,
  getTeams,
  getById
} from "../../redux/action"
import Navbar from '../../components/navbar/navbar.component'
import Cards from '../../components/cards/cards.component'

function Home() {
  const [allUsersFiltered, setAllUsersFiltered] = useState([]);

  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.allUsers)
  

  const [input, setInput] = useState({
      team: [] // Asegúrate de inicializar team según tus necesidades
  });
  const [searchString, setSearchString] = useState("") // Corrected variable name
  const [teams, setTeams] = useState([]);
  const [filtered, setfiltered] = useState(null)
  const forEachDriverId = []

  useEffect(() => {
      const fetchData = async () => {
          const driverCoincidence = []
          const DriversReturn = []
          try {
              const teamsData = await dispatch(getTeams());
              setTeams(teamsData);
          } catch (error) {
              console.error("Error fetching teams data", error);
          }
          try {

              console.group("Test group");
              const forEachTeam = []
              teams.forEach(function(objeto, index) {
                  forEachTeam.push(objeto)
              });
              console.log("forEachTeam:", forEachTeam);

              const forEachDriver = []
              allUsers.forEach(function(objeto, index) {
                  forEachDriver.push(objeto)
              });
              console.log("forEachDriver:", forEachDriver);
              console.groupEnd();

              for (const objeto of forEachDriver) {
                  const dataOfId = await dispatch(getById(objeto.id))
                  forEachDriverId.push(dataOfId)
              }
              console.log("forEachDriverId:", forEachDriverId);

          } catch (error) {
              console.error("Error fetching id data", error);
          }
          try {

              for (const objeto of forEachDriverId) {
                  for (let i = 1; i < objeto.payload.length; i++) {
                      for (let j = 0; j < input.team.length; j++) {
                          if (objeto.payload[i].TeamId === input.team[j]) {
                              driverCoincidence.push(objeto);
                          }
                      }
                  }
              }
              console.log("driverCoincidence:", driverCoincidence);
          } catch (error) {
              console.error("Error driverCoincidence", error);
          }
          try {

              for (const objeto of driverCoincidence) {
                  console.log("llega:", objeto.payload[0])
                  DriversReturn.push(objeto.payload[0])
              }
              console.log("DriversReturn:", input.team, DriversReturn);

          } catch (error) {
              console.error("Error fetching DriversReturn data", error);
          }
      };

      fetchData();
  }, [dispatch]);

  useEffect(() => {
      // Esta función se ejecutará cada vez que input.team cambie
      const handleTeamChange = async () => {
          // Realiza las acciones que necesitas al cambiar input.team
          console.log("El valor de input.team ha cambiado:", input.team);

          // Aquí puedes llamar a tu función serch(input.team) o cualquier otra acción que desees
          const filtrado = serch(input.team);
      };

      // Llama a la función handleTeamChange cuando input.team cambie
      const AfterHandleTeamChange = async () => {
        console.log("El valor de filtro ha cambiado:");
      
        let filtrado;
        if (filtrado !== null) {
            // Quiero que allUsersFiltered sea igual a allUsers
            setAllUsersFiltered(allUsers);
            console.log("no se activa");
          } else {
            // Quiero que allUsersFiltered sea igual a filtrado
            setAllUsersFiltered(filtrado);
            console.log("se activa");
          }
          
      };
      let filtrado;
      handleTeamChange().then(() => {
        const result = AfterHandleTeamChange();
        // hacer algo con 'result' si es necesario
        filtrado = result;
      });

      
      
  }, [input.team]);
  //taba aca el for each de teams y driver


  console.log("teams:", teams)

  function handleChange(e) {
    e.preventDefault()
    setSearchString(e.target.value)
      if (e.target.name === "team") {
          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
          setInput((prevInput) => ({
              ...prevInput,
              [e.target.name]: selectedOptions,
          }));
      } else {
          setInput((prevInput) => ({
              ...prevInput,
              [e.target.name]: e.target.value,
          }));
      }
  }


  function handleSubmit(e) {
      e.preventDefault()

      dispatch(getByName(searchString))
      useEffect()
  }

  function serch(aFiltrar) {
      console.log("inicio serch")
      const fetchData = async () => {
          console.log("sigue serch")
          const driverCoincidence = []
          const DriversReturn = []
          try {
              const teamsData = await dispatch(getTeams());
              setTeams(teamsData);
              if (aFiltrar.length === 0) {
                return setAllUsersFiltered(allUsers);
              }
              
          } catch (error) {
              console.error("Error fetching teams data", error);
          }
          try {

              console.group("Test group");
              const forEachTeam = []
              teams.forEach(function(objeto, index) {
                  forEachTeam.push(objeto)
              });
              console.log("forEachTeam:", forEachTeam);

              const forEachDriver = []
              allUsers.forEach(function(objeto, index) {
                  forEachDriver.push(objeto)
              });
              console.log("forEachDriver:", forEachDriver);
              console.groupEnd();

              for (const objeto of forEachDriver) {
                  const dataOfId = await dispatch(getById(objeto.id))
                  forEachDriverId.push(dataOfId)
              }
              console.log("forEachDriverId:", forEachDriverId);

          } catch (error) {
              console.error("Error fetching id data", error);
          }
          try {

              for (const objeto of forEachDriverId) {
                  for (let i = 1; i < objeto.payload.length; i++) {
                      for (let j = 0; j < aFiltrar.length; j++) {
                          if (objeto.payload[i].TeamId === aFiltrar[j]) {
                              driverCoincidence.push(objeto);
                          }
                      }
                  }
              }
              console.log("driverCoincidence:", driverCoincidence);
          } catch (error) {
              console.error("Error driverCoincidence", error);
          }
          try {

              for (const objeto of driverCoincidence) {
                  console.log("llega:", objeto.payload[0])
                  DriversReturn.push(objeto.payload[0])
              }

              console.log("DriversReturn:", aFiltrar, DriversReturn);
              return DriversReturn

          } catch (error) {
              console.error("Error fetching DriversReturn data", error);
          }

      };
      fetchData();
  }


  useEffect(() => {
      dispatch(getUsers())
      const doIt = async () => {
          const result = await getAllUsers(dispatch)
          console.log("result:", result)

          return result
      }
  }, [dispatch])




  console.log("handleChange:", handleChange)
  console.log("allUsers:", allUsers)
  console.log("allUsersFiltered:", allUsersFiltered)
  console.log("input.team:", input.team)

  console.log("lo que llega al home:" + allUsers.id)
  
  return (
    
    <div className="home">

    <p className='home-title'>Home</p>

    <select name="team" multiple value={input.team} onChange={handleChange}>
        <option value={[]}>Ninguno</option>
        {teams.map((team) => (
        <option key={team.id} value={team.id}>
            {team.nombre}
        </option>
        ))}
    </select>
    

    <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

    <Cards allUsers={allUsers} />

</div>
  )
}

export default Home

//notas
/* if (input.team.length === 0 || input.team[0] === "") {
      newErrors = { ...newErrors, team: 'Selecciona al menos un equipo.' };
    }*/