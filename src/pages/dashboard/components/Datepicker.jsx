import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css'; // Importez le thème Flatpickr

function Datepicker() {

  const options = {
    mode: 'single', // Changez le mode en 'single' pour n'avoir qu'une seule date
    dateFormat: 'M j, Y', // Format de la date
    defaultDate: new Date(), // Définir la date par défaut comme étant la date d'aujourd'hui
    static: true,
  };

  return (
    <div className="relative">
      <Flatpickr 
        className="form-input pl-9 dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium w-[15.5rem]" 
        options={options} 
      />
      {/* Supprimez la div contenant le bouton de navigation */}
    </div>
  );
}

export default Datepicker;
