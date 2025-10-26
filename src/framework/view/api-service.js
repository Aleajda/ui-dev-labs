
export default class ApiService {
 
   constructor(endPoint) {
     this._endPoint = endPoint;
   }


   async _load({
     url,
     method = 'GET',
     body = null,
     headers = new Headers(),
   }) {
     const response = await fetch(
       `${this._endPoint}/${url}`,
       { method, body, headers },
     );
      try {
       ApiService.checkStatus(response);
       return response;
     } catch (err) {
       ApiService.catchError(err);
     }
   }
  
   static parseResponse(response) {
     return response.json();
   }
   
   static checkStatus(response) {
     if (!response.ok) {
       throw new Error(`${response.status}: ${response.statusText}`);
     }
   }
  
   static catchError(err) {
     throw err;
   }

   async updateTask(task) {
    const response = await this._load({
        url: `tasks/${task.id}`,
        method: 'PUT',
        body: JSON.stringify(task),
        headers: new Headers({'Content-Type': 'application/json'}),
    })

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
   }

   async deleteTask(taskId) {
    await this._load({
        url: `tasks/${taskId}`,
        method: 'DELETE'
    })
   }
 }
