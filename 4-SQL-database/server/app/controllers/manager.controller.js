
const validator = require('validator');

const service = require('../services/manager.service');

class ManagerController {

  createManager = async (req, res) => {

    const fullName = req.body.fullName;

    try {
      if (!fullName) {
        res.status(400).send({
          message: 'Field fullName can`t be empty!'
        });

        return;
      }

      const managerData = await service.create(fullName);

      res.send(managerData.rows);

    } catch (err) {
      console.error(err);

      res.status(404).send({
        err,
        message: 'Some error occurred while creating Manager.'
      });
    }
  };

  findAllManagers = async (req, res) => {

    try {
      const allManagersData = await service.findAll();

      if (allManagersData.rows.length === 0) {
        res.send('No managers found');

        return;
      }

      res.send(allManagersData.rows)

    } catch (err) {
      console.error(err);

      res.status(404).send({
        err,
        message: 'Some error occurred while retriving list of Managers.'
      });
    }
  };

  findOneManager = async (req, res) => {

    const managerId = req.params.id;

    try {
      const managerData = await service.findOne(managerId);

      res.send(managerData.rows);
    } catch (err) {
      console.error(err);

      res.status(404).send({
        err,
        message: `Some error occurred while finding Manager with id ${managerId}.`
      });
    }
  };

  updateManager = async (req, res) => {

    const id = req.params.id;
    const newManagerName = req.body.fullName;

    try {

      if (id && !validator.isUUID(id)) {
        res.status(400).send({
          message: 'You have entered an invalid manager ID'
        });
        return;
      }

      const updatedManagerData = await service.update(newManagerName, id);


      if (updatedManagerData.rows.length === 0) {
        res.send({
          message: `Cannot update Manager with id=${id}. Maybe Manager was not found or req.body is empty!`
        });
      }

      return res.send({
        message: `Manager with id ${id} was updated successfully.`
      });
    } catch (err) {
      console.error(err);

      res.status(404).send({
        err,
        message: `Error updating Manager with id ${id}`
      });
    }
  };

  deleteManager = async (req, res) => {
    const id = req.params.id;

    try {

      if (id && !validator.isUUID(id)) {
        res.status(400).send({
          message: 'You have entered an invalid manager ID'
        });

        return;
      }

      const deletedManagerData = await service.delete(id)

      if (deletedManagerData.rows.length === 0) {

        return res.send({
          message: `Cannot delete with id=${id}. Maybe Manager was not found or req.body is empty!`
        });

      }

      return res.send({
        message: `Manager with id ${id} was deleted successfully.`
      });

    } catch (err) {
      console.error(err);

      res.status(404).send({
        err,
        message: `Error deleting Manager with id ${id}`
      });
    }
  };

  deleteAllManagers = async (req, res) => {
    try {
      const deletedManagersData = await service.deleteAll();

      if (deletedManagersData.rows.length === 0) {
        
        return res.send({
          message: `Nothing to delete`
        });
      }

      return res.send({
        message: `${deletedManagersData.rows.length} Managers were deleted successfully!`
      });

    } catch (err) {
      console.error(err);

      res.status(404).send({
        err,
        message: 'Some error occurred while removing all Managers.'
      });
    }
  };

  checkExistanceManager = async (id) => {

    const managerId = id;

    try {

      if (managerId && !validator.isUUID(managerId)) return false;

      const verifiableManager = await service.checkExistance(id);

      return !!verifiableManager.rows.length === true

    } catch (err) {
      return false;
    }
  }
}

module.exports = new ManagerController();