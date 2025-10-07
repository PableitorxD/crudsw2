import graphene
from graphene_django.types import DjangoObjectType
from personas.models import Persona

# 🔹 Tipo GraphQL basado en el modelo Persona
class PersonaType(DjangoObjectType):
    class Meta:
        model = Persona

# 🔹 Consulta para listar todas las personas
class Query(graphene.ObjectType):
    all_personas = graphene.List(PersonaType)

    def resolve_all_personas(root, info):
        return Persona.objects.all()

# 🔹 Mutación para crear una persona
class CreatePersona(graphene.Mutation):
    class Arguments:
        nombres = graphene.String(required=True)
        apellidos = graphene.String(required=True)
        edad = graphene.Int(required=True)
        correo = graphene.String(required=True)
        telefono = graphene.String(required=True)
        direccion = graphene.String(required=True)

    persona = graphene.Field(PersonaType)

    def mutate(self, info, nombres, apellidos, edad, correo, telefono, direccion):
        persona = Persona(
            nombres=nombres,
            apellidos=apellidos,
            edad=edad,
            correo=correo,
            telefono=telefono,
            direccion=direccion
        )
        persona.save()
        return CreatePersona(persona=persona)

# 🔹 Mutación para actualizar una persona
class UpdatePersona(graphene.Mutation):
    class Arguments:
        idpersona = graphene.ID(required=True)
        nombres = graphene.String()
        apellidos = graphene.String()
        edad = graphene.Int()
        correo = graphene.String()
        telefono = graphene.String()
        direccion = graphene.String()

    persona = graphene.Field(PersonaType)

    def mutate(self, info, idpersona, **kwargs):
        persona = Persona.objects.get(pk=idpersona)
        for key, value in kwargs.items():
            setattr(persona, key, value)
        persona.save()
        return UpdatePersona(persona=persona)

# 🔹 Mutación para eliminar una persona
class DeletePersona(graphene.Mutation):
    class Arguments:
        idpersona = graphene.ID(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, idpersona):
        persona = Persona.objects.get(pk=idpersona)
        persona.delete()
        return DeletePersona(ok=True)

# 🔹 Consolidar todas las mutaciones
class Mutation(graphene.ObjectType):
    create_persona = CreatePersona.Field()
    update_persona = UpdatePersona.Field()
    delete_persona = DeletePersona.Field()

# 🔹 Esquema final
schema = graphene.Schema(query=Query, mutation=Mutation)
