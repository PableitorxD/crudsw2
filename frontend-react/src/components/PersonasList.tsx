import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// 🔹 Consulta para obtener todas las personas
const GET_PERSONAS = gql`
  query {
    allPersonas {
      idpersona
      nombres
      apellidos
      edad
      correo
      telefono
      direccion
    }
  }
`;

// 🔹 Mutación para eliminar una persona
const DELETE_PERSONA = gql`
  mutation($id: ID!) {
    deletePersona(idpersona: $id) {
      ok
    }
  }
`;

// 🔹 Mutación para actualizar una persona
const UPDATE_PERSONA = gql`
  mutation(
    $id: ID!
    $nombres: String
    $apellidos: String
    $edad: Int
    $correo: String
    $telefono: String
    $direccion: String
  ) {
    updatePersona(
      idpersona: $id
      nombres: $nombres
      apellidos: $apellidos
      edad: $edad
      correo: $correo
      telefono: $telefono
      direccion: $direccion
    ) {
      persona {
        idpersona
        nombres
        apellidos
        edad
        correo
        telefono
        direccion
      }
    }
  }
`;

// 🔹 Mutación para crear una persona
const CREATE_PERSONA = gql`
  mutation(
    $nombres: String!
    $apellidos: String!
    $edad: Int!
    $correo: String!
    $telefono: String!
    $direccion: String!
  ) {
    createPersona(
      nombres: $nombres
      apellidos: $apellidos
      edad: $edad
      correo: $correo
      telefono: $telefono
      direccion: $direccion
    ) {
      persona {
        idpersona
        nombres
      }
    }
  }
`;

export default function PersonasList() {
  const { loading, error, data, refetch } = useQuery(GET_PERSONAS);
  const [deletePersona] = useMutation(DELETE_PERSONA);
  const [updatePersona] = useMutation(UPDATE_PERSONA);
  const [createPersona] = useMutation(CREATE_PERSONA);

  const [form, setForm] = useState({
 

    nombres: '',
    apellidos: '',
    edad: '',
    correo: '',
    telefono: '',
    direccion: ''
  });

const [actualizando, setActualizando] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { nombres, apellidos, edad, correo, telefono, direccion } = form;

    if (!nombres || !apellidos || !edad || !correo || !telefono || !direccion) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    createPersona({
      variables: {
        nombres,
        apellidos,
        edad: parseInt(edad),
        correo,
        telefono,
        direccion
      }
    }).then(() => {
      alert("Persona creada");
      setForm({
        nombres: '',
        apellidos: '',
        edad: '',
        correo: '',
        telefono: '',
        direccion: ''
      });
      refetch();
    });
  }

  function handleDelete(id: string) {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta persona?")) {
      deletePersona({ variables: { id } }).then(() => {
        alert("Persona eliminada");
        refetch();
      });
    }
  }

  function handleEdit(p: any) {
  const nombres = prompt("Nuevo nombre:", p.nombres);
  const apellidos = prompt("Nuevo apellido:", p.apellidos);
  const edadStr = prompt("Nueva edad:", p.edad.toString());
  const correo = prompt("Nuevo correo:", p.correo);
  const telefono = prompt("Nuevo teléfono:", p.telefono);
  const direccion = prompt("Nueva dirección:", p.direccion);

  if (
    !nombres || !apellidos || !edadStr ||
    !correo || !telefono || !direccion
  ) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const edad = parseInt(edadStr, 10);
  if (isNaN(edad)) {
    alert("La edad debe ser un número válido.");
    return;
  }

  updatePersona({
    variables: {
      id: p.idpersona,
      nombres,
      apellidos,
      edad,
      correo,
      telefono,
      direccion
    }
  }).then(() => {
    alert("Persona actualizada");
    refetch();
  });
}

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <p>Bienvenido al sistema de gestión de personas</p>
      <p>🔄 Cargando datos...</p>
    </div>
  );

  if (error) return <p>Error: {error.message}</p>;

  if (data.allPersonas.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>No hay personas registradas aún.</p>
      </div>
    );
  }

  return (
  <div className="container mt-4">
    <h2 className="mb-4">Agregar nueva persona</h2>
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-md-6">
        <input className="form-control" name="nombres" placeholder="Nombres" value={form.nombres} onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <input className="form-control" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <input className="form-control" name="edad" placeholder="Edad" value={form.edad} onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <input className="form-control" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <input className="form-control" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
      </div>
      <div className="col-12">
        <input className="form-control" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">➕ Agregar</button>
      </div>
    </form>

    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Lista de Personas</h2>
      <button
        className="btn btn-outline-secondary"
        onClick={() => {
          setActualizando(true);
          refetch().finally(() => setActualizando(false));
        }}
        disabled={actualizando}
      >
        {actualizando ? "🔄 Actualizando..." : "🔄 Refrescar"}
      </button>
    </div>

    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.allPersonas.map((p: any) => (
          <tr key={p.idpersona}>
            <td>{p.nombres}</td>
            <td>{p.apellidos}</td>
            <td>{p.edad}</td>
            <td>{p.correo}</td>
            <td>{p.telefono}</td>
            <td>{p.direccion}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>✏️ Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.idpersona)}>🗑️ Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
};

