import Modal from "../comp/shared/modal.jsx";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";

const HomeModal = ({
  CloseModal,
  titleInput,
  detailsInput,
  addBtn,
  AddNewTask,
  title,
  details,
  array,
  showLoading,
}) => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <Modal CloseModal={CloseModal}>
      <div className="tasks">
        <input
          value={title}
          className="task-input"
          onChange={(eo) => titleInput(eo)}
          required
          type="text"
          placeholder={t("add_new_task")}
        />
        <div className="details">
          <input
            className="details-input"
            onChange={(eo) => detailsInput(eo)}
            value={details}
            required
            type="text"
            placeholder={t("add_details")}
          />

          <button
            onClick={(eo) => {
              eo.preventDefault();
              addBtn(eo);
            }}
            className="btn-details"
          >
            {t("add")}
          </button>
        </div>
        {array.map((item) => (
          <div key={item}>
            <li>{item}</li>
          </div>
        ))}

        <button
          onClick={async (eo) => AddNewTask(eo)}
          className="btn-task"
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={22}
              width={13}
            />
          ) : (
            t("add_task")
          )}
        </button>
      </div>
    </Modal>
  );
};

export default HomeModal;
